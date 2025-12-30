/**
 * Template Type Definition
 * Define interfaces for your test data to ensure type safety.
 */
export interface GenericTestData {
    url: string;
    expectedTitle: string;
    actionItems?: string[];
}

export interface TestDataFile {
    templateScenario: GenericTestData;
}
