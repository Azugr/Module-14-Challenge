import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const CreateTicket = () => {
  // State to store the new ticket data
  const [newTicket, setNewTicket] = useState<TicketData | undefined>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });

  // State to store the list of users
  const [users, setUsers] = useState<UserData[] | undefined>([]);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to retrieve all users from the API
  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  // useEffect to fetch users on component mount
  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTicket) {
      const data = await createTicket(newTicket);
      console.log(data);
      navigate('/');
    }
  };

  // Handle changes in text areas
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  // Handle changes in text inputs and select elements
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  // Handle changes in user selection
  const handleUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        <label htmlFor='tName'>Ticket Name</label>
        <textarea 
          id='tName'
          name='name'
          value={newTicket?.name || ''}
          onChange={handleTextAreaChange}
        />
        <label htmlFor='tStatus'>Ticket Status</label>
        <select 
          name='status' 
          id='tStatus'
          value={newTicket?.status || ''}
          onChange={handleTextChange}
        >
          <option value='Todo'>Todo</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <label htmlFor='tDescription'>Ticket Description</label>
        <textarea 
          id='tDescription'
          name='description'
          value={newTicket?.description || ''}
          onChange={handleTextAreaChange}
        />
        <label htmlFor='tUserId'>User's ID</label>
        <select
          name='assignedUserId'
          value={newTicket?.assignedUserId || ''}
          onChange={handleUserChange}
        >
          {users ? users.map((user) => (
            <option key={user.id} value={String(user.id)}>
              {user.username}
            </option>
          )) : (
            <textarea 
              id='tUserId'
              name='assignedUserId'
              value={newTicket?.assignedUserId || 0}
              onChange={handleTextAreaChange}
            />
          )}
        </select>
        <button type='submit' onSubmit={handleSubmit}>Submit Form</button>
      </form>
    </div>
  );
};

export default CreateTicket;