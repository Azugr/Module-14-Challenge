import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI.js';
import { TicketData } from '../interfaces/TicketData.js';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', newTicket);

    try {
      const data = await createTicket(newTicket);
      console.log('Ticket created:', data);
      navigate('/'); 
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>

          <label htmlFor="tName">Ticket Name</label>
          <input
            type="text"
            id="tName"
            name="name"
            value={newTicket.name}
            onChange={handleTextChange}
            required
          />

          <label htmlFor="tStatus">Ticket Status</label>
          <select 
            name="status" 
            id="tStatus"
            value={newTicket.status}
            onChange={handleTextChange}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <label htmlFor="tDescription">Ticket Description</label>
          <textarea 
            id="tDescription"
            name="description"
            value={newTicket.description}
            onChange={handleTextChange}
            required
          />

          <button type="submit">Submit Ticket</button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;
