interface PlaylistProps {
    playlistLink: string
}

const Playlist = (props: PlaylistProps) => {
  return (
    <iframe
      src={props.playlistLink}
      width="300"
      height="380"
      frameBorder="0"
      allow="encrypted-media"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  );
};
export default Playlist
