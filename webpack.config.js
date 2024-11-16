const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
    const envVars = dotenv.config().parsed || {};

    return {
        // ... other webpack config
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    SUPABASE_URL: envVars.SUPABASE_URL,
                    SUPABASE_KEY: envVars.SUPABASE_KEY,
                }),
            }),
        ],
    };
};
