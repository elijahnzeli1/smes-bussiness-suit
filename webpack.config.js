const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
    // Load env file
    const envPath = '.env';
    const envVars = dotenv.config({ path: envPath }).parsed || {};

    return {
        // ... other webpack config
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    SUPABASE_URL: envVars.SUPABASE_URL,
                    SUPABASE_KEY: envVars.SUPABASE_KEY,
                }),
            }),
            // ... other plugins
        ],
    };
};
