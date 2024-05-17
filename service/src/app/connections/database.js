import mongoose from 'mongoose'

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log(`connected to ${process.env.DATABASE_URL}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

const disconnect = async () => {
  await mongoose.disconnect()
  mongoose.connection.removeAllListeners()
  console.log('[MONGODB] close connection...')
}

export default { connect, disconnect }
