import { Hacker } from '../hackerSortingAlgo'

export function printMembers (hackerList : Hacker[]) {
  hackerList.forEach((member) => {
    console.log(
      `ID: ${member._id}
      | EMAIL: ${member.email}
      | assignedCabin: ${member.assignedCabin}
      | secondAssignedCabin: ${member.secondAssignedCabin}`
    )
  })
}