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

This is an issue that is needed to be resolved
all my logs are not loggin as the process.exit is executed before everything is registered
need to improve this logic, but it is complicated so move on to other tasks
await new Promise((resolve) => {
for (const transport of logger.transports) {
transport.once("finish", resolve);
transport.end();
}
});

---

### How to design Provider models

Registration should only ask for credentials (email, phone, password), maybe vendor/brand name — and the rest should be filled progressively (like in profile setup later).

As you can see, there are multiple things other than just credentials that are required, so if i want to just create an account for the provider role i will have to add all those details as well or else i won't be able to create the provider role profile, this is an issue because i do not wish to over load the provider to register and create all at the same time, what should i do?

This is a database design problem that has 2 solutions

# Solution 1:

For now just stick to one model and other than credentials mark everything else to be not required and once the provider account is created, prompt the provider to complete the rest of his/her profile and once the whole profile is setupped completely only then mark the data as completed (Add a field by the name ProfileCompleted which will be false as default and true once all the required things are done)

Practically Solution -->
Make Fields Optional at First:

On registration → save just credentials.
On profile completion → progressively update the rest.

## This is what companies like Google, LinkedIn, Uber, etc. do: allow login/signup → ask for profile piece-by-piece.

---

# Solution 2:

Create separate Schemas for account registration and profile details, then embed both together, but this is more comple and would need extra joins/queries, can use this pattern later when my system gets bigger

Practically Solution -->

Credential model (for authentication-only users — email, phone, password)
Provider profile model (linked via providerId or userId, stores service/location/etc.)

Company / Platform	    Uses Option 2?	            Notes

Uber, Ola, Lyft	        ✅ Yes              Riders vs Drivers separation
Amazon	                ✅ Yes              Buyers vs Sellers separation
Stripe / Razorpay	    ✅ Yes              Secure, audited separation
LinkedIn / Indeed	    ✅ Yes	           Profile differs by intent
Slack / Notion	        ✅ Yes	           Account vs workspace profile
Microservices apps	    ✅ Yes	           Identity managed separately

### I think i should use the seccond option or atleas have a common module for authentication modeling

<!-- Start working on it -->