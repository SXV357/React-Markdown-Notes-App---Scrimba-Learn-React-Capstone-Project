# This project consists of two versions:

1. The notes that the user creates and interacts with are loaded from local storage and managed by local state.
2. The notes that the user creates and interacts with are stored in the firestore database.

The original version is available for viewing in the `V1 - Local Storage` folder, and the project is currently configured and operating around the second version.

## Features available in V2 - Firestore
- Firebase authentication has been enabled such that the application can now support multiple users.
- Notes are fetched from the database depending on which user is currently signed in and users are also prompted to create a new note if they don't have any previously created ones.
- Validation has been enabled to handle all possible authentication errors and to ensure the user has a smooth experience.
- The user is prevented from interacting with the view switchers and the editor when they have no notes.
- The user is able to sign out whenever they wish.

## Drawbacks
The application is non-responsive since it's meant to only be used on a desktop resolution. If accessed through any other means, all the elements will be disoriented.
