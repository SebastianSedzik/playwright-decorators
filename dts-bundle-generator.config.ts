const config = {
    compilationOptions: {
        preferredConfigPath: './tsconfig.json'
    },
    entries: [
        {
            filePath: './lib/index.ts',
            outFile: './dist/index.d.ts',
            output: {
                exportReferencedTypes: false,
                noBanner: true
            }
        }
    ]
};

module.exports = config;
