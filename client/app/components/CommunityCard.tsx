import { Community, User } from '@prisma/client'
import React from 'react'


interface CommunityCard {
    currentUser : User | null;
    community : Community
}


const CommunityCard = ({currentUser, community} : CommunityCard) => {
    return (
        <div>
        
        </div>
    )
}

export default CommunityCard
