module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/support/design.scss";
          `
        }
      }
    },
    
    productionSourceMap: false,
  }