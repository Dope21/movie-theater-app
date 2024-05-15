import { Types } from 'mongoose'

const stringToObjectId = (stringId) => new Types.ObjectId(stringId)

export default stringToObjectId
