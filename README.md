###

ISSUE ENCOUNTERED IN PROJECT

##

MONGOOSE.DISCONNECT() OR MONGOOSE.CONNECTION.CLOSE() ERROR --> NODEMON ISSUE

NODEMON WILL DISRUPT OR INTERRUPT THE CONNECTION AS SOON AS POSSIBLE, SO USE NODE COMMAND TO RUN THE PROGRAM

##

DOTENV CONFIG ISSUE IN SEEDER FILES:

Every independent file like seeders would need their own dotenv.config() configuration because they do not have any parent file that provides them with this confifurations and as a result would get undefined values for the env variables

###

Logger flushing issue : Read more below

<!--
This is an issue that is needed to be resolved
all my logs are not loggin as the process.exit is executed before everything is registered
need to improve this logic, but it is complicated so move on to other tasks
await new Promise((resolve) => {
for (const transport of logger.transports) {
transport.once("finish", resolve);
transport.end();
}
}); -->
