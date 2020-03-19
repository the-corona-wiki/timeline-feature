to get it working, you need to start the api server first and then the react server

```
cd ./coronavirus-tracker-api
python3 -m flask run
cd ../client
npm start
```

you can try running `bash script` from the timeline-feature folder but I couldn't figure out a way to shut down all ports when you want to exit. I avoid running this unless you know how to create bash scripts.