interface PlaylistProps {
  playlistLink: string;
}

const Playlist = (props: PlaylistProps) => {
  return (
    <iframe
      style={{"borderRadius":"12px"}}
      src={props.playlistLink}
      width="100%"
      height="352"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media *; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};
export default Playlist;
