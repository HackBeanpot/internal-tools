// TODO: restructure code to service and dao files

import { NextApiRequest, NextApiResponse } from 'next'
import SortedHackerApplicationDataService
  from '../../../../lib/service/SortedHackerApplicationDataService'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method

  switch (requestMethod) {
    case 'GET':
      return GetHandler(req, res)
    case 'POST':
      return res.status(200).send({ message: 'works' })
    case 'DELETE':
      return res.status(200).send({ message: 'works' })
    case 'PUT':
      return res.status(200).send({ message: 'works' })
  }
}

async function GetHandler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const hackersWithAssignedCabins =
      await SortedHackerApplicationDataService.getAllHackersWithAssignedCabins()
    return res.status(200).send({ hackersWithAssignedCabins })
  } catch (error) {
    res.status(500).send({ error })
  }
}
