import { bot } from "../bot.ts"
import { addUser, getUsers } from "../kv.ts"
import { getFeed } from "../feed.ts"

bot.command("start",async (ctx) => {
    const users = await getUsers()
    if(!users.includes(ctx.message?.chat.id))
    addUser(ctx.message?.chat.id)
    await ctx.reply("A'zolik qo'shildi.")
})

setInterval(async() =>{
    let users = await getUsers()
    let feed = await getFeed()

    for(let id of users){
        let result = `${feed.title?.value}\n\n${feed.description?.value}<a href='${feed.id}'></a>`
                .replaceAll("<p>", " ")
                .replaceAll("</p>", " ")
                .replaceAll("<br>", "\n")

        bot.api.sendMessage(id, result, {parse_mode: "HTML"})
    }
}, 100000);
