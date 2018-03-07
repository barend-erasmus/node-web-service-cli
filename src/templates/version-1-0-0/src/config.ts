export const config = {
    cache: {
        memcached: {
            uri: 'api.suite.worldofrations.com:11211',
        },
    },
    cryptography: {
        password: 'RP!t3LwwkcazCae8',
    },
    database: {
        host: '138.68.188.8',
        password: '75347b943b4d9a946e455c25c3abe8a2',
        superUserPassword: '3a59758c276fcbb3377858108ce1ccbf8d',
        userName: 'diet-formulator-service',
    },
    email: {
        sendgrid: {
            apiKey: '00261b8204768ee10b2a7032aee3c0a3c1697f421a9a2e0fb4b4d1f9b500ad5bc300d107736c1421410d8bfe2e4c8ba434c40406829dd89481de06a2bffbd7051133a5d95d',
        },
    },
    paymentGateway: {
        payfast: {
            merchantId: '11223714',
            merchantSecret: '320a00887d77cde722744e0495',
            secret: '3e2c60b11270fa85152a7305cfc0dba3',
        },
    },
};
