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

export const testCreateHackerTableRequest = {
    body: {
        "project": "test project",
        "time": "3:00",
        "judges": ["Judge1", "Judge2"],
        "room": "Room1"
    }
}

export const testDeleteHackerTableRequest = {
    body: {
        "project": "test delete project",
        "time": "3:00",
        "judges": ["Judge1", "Judge2"],
        "room": "Room1"
    }
}

export const testCreateJudgeTableRequest = {
    body: {
        "judge": "judge1",
        "time": "3:00",
        "project": "test create judge table",
        "room": "Room1"
    }
}

export const testDeleteJudgeTableRequest = {
    body: {
        "judge": "judge1",
        "time": "3:00",
        "project": "test delete judge table",
        "room": "Room1"
    }
}

export const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};