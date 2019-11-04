function newLinkSubscription(parent, args, context, info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

function newVoteSubscription(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
}

const newLink = {
    subscribe: newLinkSubscription,
    resolve: payload => payload
}

const newVote = {
    subscribe: newVoteSubscription,
    resolve: payload => payload
}

module.exports = {
    newLink,
    newVote
}