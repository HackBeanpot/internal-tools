export type Judge = {
  name: string,
  inPerson: boolean,
  company: string
}

export type HackerTeam = {
  name: string,
  liveDemo: string
}

export type Room = {
  name: string
}

export type JudgeOutput = {
  judge: string, 
  time: string,
  project: string, 
  room: string
}

export type JudgeOutputLiveSite = {
  judge: string, 
  room: string,
  projects: JudgeOutputProjectsLiveSite[]
}

export type JudgeOutputProjectsLiveSite = {
  project: string,
  time: string
}

export type FinalOutputTables = {
  judgeOutput: JudgeOutput[];
  hackerOutput: HackerOutput[];
}

export type HackerOutput = {
  project: string, 
  time: string, 
  judges: string[], 
  room: string
}