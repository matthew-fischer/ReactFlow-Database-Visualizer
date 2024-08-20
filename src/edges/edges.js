export const fetchEdges = async (filename) => {
    try {
        // Import the JSON file dynamatically.
        const data = await import(`../jsonFiles/${filename}.json`);
        let data_json = data.default;
        let edges_list = [];
        for (let i = 0; i < data_json.edges.length; i++) {
            // This for loop will loop over each edge in the JSON file.
            edges_list.push(data_json.edges[i]);
        }
        return edges_list;
    } catch (error) {
        console.error("Error loading data: ", error);
        throw error;  // Re-throw the error after logging.
    }
};