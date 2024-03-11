// global.d.ts at the root
declare global {
    namespace NodeJS {
      interface Global {
        mongoose: {
          conn: null | any; // Ideally, replace `any` with `mongoose.Connection` if you have mongoose types available
          promise: null | Promise<any>; // Similarly, use `Promise<mongoose.Connection>` if possible
        };
      }
    }
  }
  
  export {};
  