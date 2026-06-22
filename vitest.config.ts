import {defineConfig} from "vitest/config"

export default defineConfig({
    test: {
        exclude: ['dist'],
        projects: [
            {
                test: {
                    name: 'unit',
                    include: ['./src/test/unit/*/*.test.ts']
                },
            },
            {
                test: {
                    name: 'int',
                    include: ['./src/test/int/*/*.test.ts']
                }
            }
        ]
        
    }
})