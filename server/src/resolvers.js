// const fetch = require("node-fetch");

const resolvers = {
  Query: {
    // returns an array of tracks that is used on the homepage
    tracksForHome: (parent, args, context, info) => {
      const { dataSources } = context;
      return dataSources?.trackAPI?.getTracksForHome();
    },
    // gets results for a single Track
    track: (parent, args, context, info) => {
      const { id } = args;
      const { dataSources } = context;
      return dataSources?.trackAPI?.getTrack(id);
    },
  },
  Mutation: {
    incrementTrackViews: async (parent, { id }, { dataSources }, info) => {
      try {
        const response = await dataSources?.trackAPI?.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track: response,
        };
      } catch (e) {
        return {
          code: e.extensions.response.status,
          success: false,
          message: `${e.extensions.response.body} - ${id}`,
          track: null,
        };
      }
    },
  },
  Track: {
    // author: async ({ authorId }, _, { dataSources }) => {
    //   console.info(dataSources.trackAPI);
    //   const res = await fetch(
    //     `${dataSources.trackAPI.baseURL}author/${authorId}`
    //   );
    //   return res.json();
    author: (parent, args, context, info) => {
      const { authorId } = parent;
      const { dataSources } = context;
      return dataSources?.trackAPI?.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources?.trackAPI?.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
