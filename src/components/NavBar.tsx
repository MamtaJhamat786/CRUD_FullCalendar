import React from 'react'
import Icon from '@mdi/react';
import { mdiBell, mdiBullhorn, mdiMessageText, mdiCalendarBlankOutline, mdiCloud, mdiChevronDown } from '@mdi/js';
import { useMediaQuery } from 'react-responsive';
import '../customCss/calendar.css'

const NavBar: React.FC = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 826px)` });
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light" 
        style={{backgroundColor: 'transparent !important',
                 borderBottom: '1px solid lightgray',
                 marginLeft:'10px',
                 marginRight:'10px'
                }}
        >
        <img src="https://eliis.eu/img/eliis_logo.e14f91e1.png"
                 style={{ width: '6.25rem', height: '1.875rem' }}  alt="My Logo" className="logo-img" />

        <div className="d-flex gap-2 align-items-center">
            {isMobile&& (
                <div className="badge-container">
                    <button type="button" className="btn rounded-circle" 
                    style={{
                        backgroundColor: '#A5C365',
                        padding: "5px",
                        width:"40px",
                        height: "40px",
                        fontSize: "small"

                    }}>
                    EÕ
                    </button>
                    <span className="open"><Icon style={{background: 'white', color: '#F8AC92'}} path={mdiChevronDown} size={0.7} /></span>
                </div>
            )}
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
        >
        <span className="navbar-toggler-icon"></span>
      </button>

        </div>

        

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent: 'flex-end', gap: '8px'}}> 
            <div className="d-flex gap-2 align-items-center">
            <div className="badge-container">
                <Icon path={mdiBell} size={1.2}/>
                <span className="badge">6</span>
            </div>
                <Icon path={mdiBullhorn} size={1.2} />
                <div className="badge-container">
                    <Icon path={mdiMessageText} size={1.2}/>
                    <span className="badge">23</span>
                </div>
                <div className="badge-container">
                    <Icon path={mdiCalendarBlankOutline} size={1.2}/>
                    <span className="badge">2</span>
                </div>
                <Icon path={mdiCloud} size={1.2} />
            </div>
                <hr className="border-gray" style={{ border: '1px solid lightgray' }} />

                <div className="d-flex flex-column align-items-center">
                    <div style={{fontWeight: 500}}>Elise õpetaja</div>
                    <div style={{color: '#B5CE84'}}>Lasteaed Elise</div>
                </div>
            <button type="button" className="btn rounded-circle" 
                style={{
                    backgroundColor: '#A5C365',
                    padding: "5px",
                    width:"30px",
                    height: "30px",
                    fontSize: "small"

                }}>
                    EÕ
            </button>
        </div>
</nav>
  )
}

export default NavBar;