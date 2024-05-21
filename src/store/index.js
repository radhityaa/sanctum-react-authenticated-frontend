const { atom } = require("recoil");

const authenticated = atom({
    key: 'authenticated',
    default: {
        check: false,
        user: [],
    },
})

export { authenticated }