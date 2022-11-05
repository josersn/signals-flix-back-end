import app from "./infrastructure/serve";

async function main() {
    const main = app();

    main.then((server) => {
        server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
            if (err) throw err
            console.log("Running")
        })
    })
}

main()