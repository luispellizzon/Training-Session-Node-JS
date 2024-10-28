export type FacilitiesModel = "Gym" | "Pool" | "Yoga" | "Sauna" | "Spa"

export type SessionModel = {
    _id: string;
    user_id: string;
    bookingDate: string;
    createAt: string;
    facilities: FacilitiesModel[]
}

export type UserSessions = {
    username: string;
    data: {
        sessions: Omit<SessionModel, "user_id">[]
        totalSessions: string
    }
}