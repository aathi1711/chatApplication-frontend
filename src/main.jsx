
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
import { ProfileProvider } from './context/profileContext.jsx'
import { ChatIdProvider } from './context/chatContext.jsx'
import { UpdateTriggerProvider } from './context/updateTrigger.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ProfileProvider>
      <ChatIdProvider>
        <UpdateTriggerProvider>
        <App />
        </UpdateTriggerProvider>
      </ChatIdProvider>
     </ProfileProvider>
  </UserProvider>
)
