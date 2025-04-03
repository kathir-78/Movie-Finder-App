import { Client, Databases, Query, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);


const databases = new Databases(client);

export const createTrendingMovie = async(searchTerm, movie)=> {

    try {
        // check if the serach term is already exists, if exists increase the count or create the new document 
       const result =  await databases.listDocuments(DATABASE_ID, COLLECTION_ID, 
        [Query.equal('searchTerm', searchTerm)]);

        if(result.documents.length > 0) {
            const document = result.documents[0];
            document.count +=1;

            const updatedresult = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, 
                {count: document.count});

            console.log(updatedresult);
        }
        else {
            const createdresult =  await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                movie_id: movie.id
            });

            console.log(createdresult);
        }

    } catch (error) {
       console.log(error); 
    }
}

export const getTrendingMovies = async() => {

    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, 
            [Query.orderDesc('count'), Query.limit(5)]);
    
        return result.documents;
        
    } catch (error) {
        console.log(error); 
    }

}