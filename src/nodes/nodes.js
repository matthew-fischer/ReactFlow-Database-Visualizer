export const fetchNodes = async (filename) => {
    try {
        // Import the JSON file dynamically.
        const data = await import(`../jsonFiles/${filename}.json`);
        let data_json = data.default;
        let nodes_list = [];
        for (let i = 0; i < data_json.tables.length; i++){
            // This for loop will loop over each table in the JSON file.
            let style = {}, background = 'white', color = 'white';
            switch(data_json.tables[i].type) {
                case "Database1":
                    background = '#6ede87';
                    style['background'] = background;
                    style['color'] = color;
                    data_json.tables[i].data.label['style'] = style;
                    break;
                case "Database2":
                    background = '#6865A5';
                    style['background'] = background;
                    style['color'] = color;
                    data_json.tables[i].data.label['style'] = style;
                    break;
                case "Database3":
                    background = '#ff0072';
                    style['background'] = background;
                    style['color'] = color;
                    data_json.tables[i].data.label['style'] = style;
                    break;
                case "OTHER":
                    style['background'] = 'grey';
                    style['color'] = color;
                    data_json.tables[i].data.label['style'] = style;
            }
            nodes_list.push(data_json.tables[i]);
        }
        return nodes_list;
    } catch (error) {
        console.error("Error loading data: ", error);
        throw error;  // Re-throw the error after logging.
    }
};