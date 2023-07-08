export const testCreateJudgeRequest = {
    body: {
        name: "test judge",
        inPerson: true
    }
}

export const testDeleteJudgeRequest = {
    body: {
        name: "test delete judge",
        inPerson: true
    }
}

export const testCreateRoomRequest = {
    body: {
        name: "test room"
    }
}

export const testCreateRotationTimeRequest = {
    body: {
        startTime: "1:00"
    }
}

export const testCreateTeamRequest = {
    body: {
        name: "test team",
        liveDemo: "yes"
    }
}

export const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};