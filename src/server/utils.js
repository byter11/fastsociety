const fse = require( "fs-extra" );
const { join } = require( "path" );

const buildConditions = (where, prefix='') => {
   const conditionList = Object.entries(where).filter(([_, val]) => 
        typeof(val) !== 'undefined'
    );
   const conditions = conditionList.map(([k,v]) => {
      return `${prefix}${k} IN (${Array(v.length).fill('?')})`
   }).join(' AND ');
   
   const values = conditionList.map(([_,v]) => v).flat();

   return {conditions, values};
}

const loadSqlQueries = async folderName => {
   // determine the file path for the folder
   const filePath = join( process.cwd(), "src", "server", "db", folderName );

   // get a list of all the files in the folder
   const files = await fse.readdir( filePath );

   // only files that have the .sql extension
   const sqlFiles = files.filter( f => f.endsWith( ".sql" ) );

   // loop over the files and read in their contents
   const queries = {};
   for ( let i = 0; i < sqlFiles.length; i++ ) {
       const query = fse.readFileSync( join( filePath, sqlFiles[ i ] ), { encoding: "UTF-8" } );
       queries[ sqlFiles[ i ].replace( ".sql", "" ) ] = query;
   }
   return queries;
};

module.exports = {
   loadSqlQueries,
   buildConditions
};