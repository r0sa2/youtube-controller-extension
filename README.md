# YouTube Controller Extension
## About

This extension is intended to enhance YouTube controls by adding range functionality. In particular, a range slider enables looping over a segment of the video. 

The slider is initially mostly hidden, with only a portion of it appearing in the bottom left and right hand corners (see image below).

<p align="center">
    <img src="/screenshots/hidden.png" alt="Hidden" width="80%"/>
</p>

Clicking on the slider allows it be fully displayed (see image below).

<p align="center">
    <img src="/screenshots/unhidden.png" alt="Unhidden" width="80%"/>
</p>

On setting the start and end points, the video loops over the offwhite/gray region (by default, the start and end points span the entire video duration). The start and end points are displayed in bold in brackets to the right of the default YouTube time display (see image below).

<p align="center">
    <img src="/screenshots/modified.png" alt="Modified" width="80%"/>
</p>

### Built With
<ul>
    <li><a href="https://jquery.com/">jQuery</a></li>
</ul>

## Challenges Faced

The primary challenge faced was that YouTube only selectively updates DOM elements when a user navigates within YouTube. The code logic ensures that the range slider is only added once, and that the slider parameters are updated everytime a new video is opened.

Additionally, the slider seems to bug out if the start/end points are modified when the video is a live stream. As such, it is best to not modify the start and end points when viewing a live stream.

## Note

This was a personal project intended for learning purposes only.