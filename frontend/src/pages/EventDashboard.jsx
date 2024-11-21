import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import CustomAppBar from '../components/Appbar';
import { CircularProgress, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const baseUrl = 'http://localhost:8080/event'; 
  const rsvpUrl = 'http://localhost:8080/rsvp'; 


  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${baseUrl}/getAll`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [baseUrl, token]);
  const handleCardClick = (event) => {
    setSelectedEvent(event); 
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null); 
  };


  const handleRSVPDialog = async (selectedEvent) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
      const userId = currentUser.id; 
      const eventId = selectedEvent.eventId;
  
      const rsvpBody = {
        event: { eventId: eventId },  // Ensure you pass an object with eventId
        user: { userId: userId },
        status: 'confirmed', 
        rsvpTime: new Date().toISOString(), 
      };
      console.log(userId);
  
      const response = await fetch(`${rsvpUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(rsvpBody),
      });
  
      if (!response.ok) throw new Error('Failed to RSVP for the event');
      
      const data = await response.json();
      alert('RSVP successful');
    } catch (err) {
      console.error('Error while RSVPing:', err);
      alert('Failed to RSVP');
    }
  };
  
  

  

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/src/assets/images/hero.jpg)',
          backgroundSize: '90%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Typography variant="h2">Welcome to Campus Events</Typography>
      </Box>
  
      {/* Events Section */}
      <div style={{ padding: '40px', backgroundColor: '#F8F5F2', minHeight: '100vh' }}>
        <h3 style={{ color: '#C21807' }}>Events happening on Campus</h3>
  
        {error && <Typography color="error" align="center">{error}</Typography>}
  
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              padding: '20px',
            }}
          >
            {events.map((event) => (
              <div
                key={event.eventId}
                onClick={() => handleCardClick(event)} // Make the card clickable
                style={{ cursor: 'pointer' }}
              >
                <EventCard
                  id={event.eventId}
                  title={event.title}
                  date={new Date(event.startTime).toLocaleDateString()}
                  time={new Date(event.startTime).toLocaleTimeString()}
                  location={event.location}
                  category={event.category || 'General'}
                  attendees={event.maxCapacity || 0}
                  description={event.description}
                  image={
                    event.imageUrl
                      ? `http://localhost:8080${event.imageUrl}`
                      : '/path/to/placeholder.jpg'
                  }
                />
              </div>
            ))}
          </div>
        )}
  
        {/* Detailed Event Dialog */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onClose={handleCloseDialog} fullWidth maxWidth="md">
            <DialogTitle>{selectedEvent.title}</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Description</Typography>
              <Typography>{selectedEvent.description}</Typography>
  
              <Typography variant="h6" style={{ marginTop: '16px' }}>
                Location
              </Typography>
              <Typography>{selectedEvent.location}</Typography>
  
              <Typography variant="h6" style={{ marginTop: '16px' }}>
                Date & Time
              </Typography>
              <Typography>
                {new Date(selectedEvent.startTime).toLocaleString()} -{' '}
                {new Date(selectedEvent.endTime).toLocaleString()}
              </Typography>
  
              <Typography variant="h6" style={{ marginTop: '16px' }}>
                Max Capacity
              </Typography>
              <Typography>{selectedEvent.maxCapacity}</Typography>
  
              {selectedEvent.imageUrl && (
                <Box
                  component="img"
                  src={`http://localhost:8080${selectedEvent.imageUrl}`}
                  alt={selectedEvent.title}
                  sx={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    marginTop: '16px',
                    borderRadius: '8px',
                  }}
                />
              )}
            </DialogContent>
            
            <DialogActions>
            <Button onClick={() => handleRSVPDialog(selectedEvent)}>
              RSVP
              </Button>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>

  );

}
export default EventDashboard;
