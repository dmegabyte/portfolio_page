
import React from 'react';
import GlassIconWrapper from './ui/icons/GlassIconWrapper';
import TelegramIcon from './ui/icons/TelegramIcon';
import WhatsAppIcon from './ui/icons/WhatsAppIcon';
import MailIcon from './ui/icons/MailIcon';

const MessengerDashboard: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#1e2127] flex items-center justify-center p-4 relative overflow-hidden select-none" aria-hidden="true">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 360 640"
                xmlns="http://www.w3.org/2000/svg"
            >
                 <g transform="translate(180, 320) scale(1.2)">
                    {/* Icon 1: Telegram */}
                    <g className="glass-icon-group" transform="translate(-60, -60)">
                        <GlassIconWrapper glowColor="#22d3ee">
                            <TelegramIcon />
                        </GlassIconWrapper>
                    </g>

                    {/* Icon 2: WhatsApp */}
                     <g className="glass-icon-group" transform="translate(0, 0)">
                        <GlassIconWrapper glowColor="#84cc16">
                            <WhatsAppIcon />
                        </GlassIconWrapper>
                    </g>
                    
                    {/* Icon 3: Mail */}
                     <g className="glass-icon-group" transform="translate(60, 60)">
                        <GlassIconWrapper glowColor="#a855f7">
                            <MailIcon />
                        </GlassIconWrapper>
                    </g>
                 </g>
            </svg>
        </div>
    );
};

export default MessengerDashboard;
