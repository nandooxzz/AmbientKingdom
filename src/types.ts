interface SpotifyTrack {
    album: {
        images: [
            {
                url:string,
                height:number,
                width:number
            }
        ]
    }
    external_urls: Array<{spotify: string}>,
    name: string,
    artists: Array<{ external_urls: {spotify: string}, id: string, name: string }>,
    duration_ms: number
}

export type {SpotifyTrack}