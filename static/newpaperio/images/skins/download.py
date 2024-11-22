import requests
import os

# Define the list of image names with yellow dots
image_names_with_yellow_dots = [
    "babyYodaPattern.svg",
    "babyYodaBack.svg",
    "babyYodaFace.svg",
    "watermelPattern.svg",
    "watermelShadow.svg",
    "watermel.svg",
    "batDownN.svg",
    "batUpN.svg",
    "nyanPattern.svg",
    "nyanShadow.svg",
    "nyaaal.svg",
    "knitPattern.svg",
    "rndeerBack.svg",
    "rndeerFront.svg",
    "rndeerLights.svg",
    "rndeerNose.svg",
    "cupidPattern.svg",
    "cupidDown.svg",
    "cupidHandMiddle.svg",
    "cupidTop.svg",
    "doctorPattern.svg",
    "doctorBack.svg",
    "doctorFront.svg",
    "spacePattern.svg",
    "thanosHandDown.svg",
    "thanos.svg",
    "eyePattern.svg",
    "eyeShadow.svg",
    "eyeSkin.svg",
    "patternGoblin.svg",
    "unitGoblinBack.svg",
    "unitGoblin.svg",
    "clownBaloonsPattern.svg",
    "clownHeadBack.svg",
    "clownHead_back.svg",
    "clownHead_eyes.svg",
    "clownHead_forehead.svg",
    "patternWitcher.svg",
    "witcherHeadBack.svg",
    "witcherHead.svg",
    "tankPattern.svg",
    "tankBottom.svg",
    "tankDown.svg",
    "tank-top.svg",
    "frankiePattern.svg",
    "frankieBack.svg",
    "frankieSkin.svg",
    "batmanPattern.svg",
    "batmanHeadBack.svg",
    "batmanHead.svg",
]

# Define the base URL
base_url = "https://paper-io.com/newpaperio/images/skins/"

# Get the current script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Download each image
for image_name in image_names_with_yellow_dots:
    # Create the full URL
    image_url = base_url + image_name

    # Send a request to download the image
    response = requests.get(image_url, stream=True)

    # Check if the request was successful
    if response.status_code == 200:
        # Create the file path
        file_path = os.path.join(script_dir, image_name)

        # Open the file in write binary mode
        with open(file_path, "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)

        print(f"Downloaded: {image_name}")
    else:
        print(f"Failed to download {image_name} (status code: {response.status_code})")

print("All downloads completed!")