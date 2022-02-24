# Hero Training

The repository is a training demo for those new to Vue and Vuex. The tasks are as stated below:

### Step 1

Using `mapState` fetch the list of heroes from the server

### Step 2

Using `mapGetters` count the list of heroes while exluding **Iron Man**

### Step 3

Create _addHero_ action and mutation to add new heroes to the list. Use `mapActions` to dispatch the Vuex actions.

### Step 4

Create _removeHero_ action and mutation to remove a specific hero from the list.

## Application

![hero app](/app.png)

## Server

> The server uses Node.js Express with a simple JSON file as the database.

To start up server first:

```
cd server
```

Then follow the instructions [here](/server/README.md).

## Client

> The client is in Vue.js 2.0 in TypeScript with the use of Vuex as the state management.

To start up client first:

```
cd client
```

Then follow the instructions [here](/client/README.md).

## Related

Slides for the training can be found [here](https://slides.com/thomastruong/latest-state-management). Slides include a codesandbox if you do not want to pull down the codebase from GitHub.
