// Import Node.js modules.
require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

// Initialise Supabase with a service key, to have full access to the data.
const supabase = createClient("https://depctutsufqakltbwctd.supabase.co", process.env.SERVICE_KEY)

module.exports = {
    read_user: async (email) => {
        const response = await supabase
            .from("users")
            .select("*")
            .eq("email", email)

        return response.data
    },
    insert_user: async (email) => {
        await supabase
            .from("users")
            .insert([{ email: email }])
    },
    update_user: async (email, value) => {
        await supabase
            .from("users")
            .update(value)
            .eq("email", email)
    },
    read_user_goals: async (email) => {
        const response = await supabase
            .from("user_goals")
            .select(`
        id,
        email,
        goal,
        streak,
        goal ( name, icon, category )
        `)
            .eq("email", email)
            .order("id", { ascending: false })

        return response.data
    },
    update_user_goal: async (id, value) => {
        await supabase
            .from("user_goals")
            .update(value)
            .eq("id", id)
    },
    read_goals: async () => {
        const response = await supabase
            .from("goals")
            .select(`
        name,
        icon,
        category
        `)

        return response.data
    },
    add_user_goal: async (email, goal) => {
        await supabase
            .from("user_goals")
            .insert([{ email: email, goal: goal }])
    }
}