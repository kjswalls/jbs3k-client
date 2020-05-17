module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
            @import "@/assets/styles/core.scss";
          `,
            },
        },
    },
    chainWebpack: config => {
        // GraphQL Loader
        config.module
            .rule('graphql')
            .test(/\.(graphql|gql)$/)
            .use('graphql-tag/loader')
            .loader('graphql-tag/loader')
            .end()
    },
}
