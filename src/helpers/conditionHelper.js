const getCondition = (condition) => {
    return condition === 'new' ? 'Nuevo' : 'Usado'
}
module.exports = { getCondition }