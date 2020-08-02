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
            .end();

        config.optimization.splitChunks({
            minSize: 10000,
            maxSize: 250000,
        });
    },
};
