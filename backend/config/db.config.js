import dotenv  from 'dotenv'
dotenv.config()

export default {
    url: `mongodb+srv://${encodeURIComponent(process.env.APP_USER)}:${encodeURIComponent(process.env.APP_PASSWORD)}@recette.j7ynz.mongodb.net/bitter?retryWrites=true&w=majority`
}