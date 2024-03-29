export type Judge = {
  name: string,
  inPerson: boolean,
  company?: string,
  id?: string
}

export type HackerTeam = {
  name: string,
  liveDemo: string
}

export type Room = {
  name: string,
  id?: string
}

export type RotationTime = {
  startTime: string
}

export type JudgeOutput = {
  judge: string,
  time: string,
  project: string,
  room: string,
  id?: string
}

export type JudgeOutputProjectsLiveSite = {
  project: string,
  time: string
}

export type JudgeOutputLiveSite = {
  judge: string,
  room: string,
  projects: JudgeOutputProjectsLiveSite[],
  id?: string
}

export type HackerOutput = {
  project: string,
  time: string,
  judges: string[],
  room: string,
  id?: string
}

export type FinalOutputTables = {
  judgeOutput: JudgeOutput[];
  hackerOutput: HackerOutput[];
}
