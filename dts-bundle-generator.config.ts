const config = {
    compilationOptions: {
        preferredConfigPath: './tsconfig.json'
    },
    entries: [
        {
            filePath: './lib/index.ts',
            outFile: './dist/index.d.ts'
        }
    ]
};

module.exports = config;
