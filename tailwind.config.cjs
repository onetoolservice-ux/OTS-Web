module.exports = {
      content: [
            "./app/**/*.{js,jsx,ts,tsx}",
                "./components/**/*.{js,jsx,ts,tsx}"
      ],
        theme: {
                extend: {
                          colors: {
                                    ots: {
                                                  bg: "#0B0F19",
                                                            card: "#111423",
                                                                      gold: "#FFD166",
                                                                                accent: "#00B5D8"
                                    }
                          },
                                borderRadius: {
                                            xl: "1rem",
                                }
                },
        },
          plugins: [],
};
