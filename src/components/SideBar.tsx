import React, { useState } from 'react';
import Icon from '@mdi/react';
import { 
    mdiViewDashboard,
    mdiBookOpen,
    mdiCalendarMonth,
    mdiMessageBulleted,
    mdiBullhorn,
    mdiClockTimeFiveOutline,
    mdiFolderMultipleImage,
    mdiCalendarOutline,
    mdiCloud,
    mdiFoodForkDrink,
    mdiFile,
    mdiContacts,
    mdiTextBoxCheckOutline,
    mdiFan,
    mdiChevronRight,
    mdiArrowDown
 } from '@mdi/js'
import DetailView from './DetailView';


interface MainEvent {
    id: number;
    title: string;
    icon: string;
    endIcon?: string;
    openedIcon?: string
}


const mainEvents: MainEvent[] =[
    {id: 1, title: 'Dashboard', icon: mdiViewDashboard },
    {id: 2, title: 'Diary', icon: mdiBookOpen, endIcon: mdiChevronRight},
    {id: 3, title: 'Plans', icon: mdiCalendarMonth, endIcon: mdiChevronRight},
    {id: 4, title: 'Messages', icon: mdiMessageBulleted},
    {id: 5, title: 'Announcements', icon: mdiBullhorn},
    {id: 6, title: 'Work schedule', icon: mdiClockTimeFiveOutline, endIcon: mdiChevronRight},
    {id: 7, title: 'Events', icon: mdiCalendarOutline , endIcon: mdiChevronRight, openedIcon: mdiArrowDown },
    {id: 8, title: 'Gallery', icon: mdiFolderMultipleImage},
    {id: 9, title: 'Documents', icon: mdiCloud},
    {id: 10, title: 'Food menu', icon: mdiFoodForkDrink, endIcon: mdiChevronRight},
    {id: 11, title: 'Contacts', icon: mdiContacts, endIcon: mdiChevronRight},
    {id: 12, title: 'Applications', icon: mdiFile, endIcon: mdiChevronRight},
    {id: 13, title: 'Surveys', icon: mdiTextBoxCheckOutline, endIcon: mdiChevronRight},
    {id: 14, title: 'Help', icon: mdiFan, endIcon: mdiChevronRight},

]

const SideBar:React.FC = () => {
    const [openDetailView, setOpenDetailView] = useState<number | null>(null);

    const handleButtonClick = (eventId: number) => {
        setOpenDetailView((prevEventId) => (prevEventId === eventId ? null : eventId));
    };
    
  return (
    <div style={{padding:'10px'}}>
      {mainEvents.map((event)=> (
        <div className="d-flex" key={event.id}>
            <div className="d-flex flex-column">
                <button type="button" className="btn" 
                    onClick={() => handleButtonClick(event.id)}
                    style={{
                        padding: '3px',
                        background: 'linear-gradient(to top, #F7F7F7, #E4E4E4)', 
                        width: '220px',
                        marginBottom: openDetailView === event.id? 0: '10px', 
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent:'space-between',
                        gap:'4px', 
                        fontSize:'14px',
                        fontWeight: 500,
                        border: '0.5px solid #D0D0D0'
                        }}>
                    <div className="d-flex  gap-2">
                        <Icon path={event.icon} size={1} style={{borderRadius: '5px'}}/>
                        {event.title}
                    </div>
                    
                    <Icon 
                        path={ (openDetailView === event.id ?  event.openedIcon : event?.endIcon) ?? ''} 
                        size={1} 
                        style={{
                            borderRadius: '5px',
                            backgroundColor: 'transparent',
                            color: openDetailView === event.id ?  '#FF967C' : 'black'
                        }}
                    />
                </button>
                {openDetailView === event.id && <DetailView />}
            </div>
        </div>
         
      ))}
    </div>
  )
}

export default SideBar
