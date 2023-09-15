# Problem Shooting

## Sep 14

### Permissions Policy를 수정해서 권한 관리하기 `SOLVED`

- Goal
  - 모든 사용자의 Get Object 허용
  - 특정 사용자의 Put Object 허용
  - 특정 사용자 외의 Put Object 거부

### 해결 방법

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::MY_BUCKETS_NAME/"
    },
    {
      "Effect": "Deny",
      "NotPrincipal": {
        "AWS": [
          "arn:aws:iam::NUMERICAL_IAM_NUMBER:root",
          "arn:aws:iam::NUMERICAL_IAM_NUMBER:user/USERNAME"
        ]
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::MY_BUCKETS_NAME/*"
    }
  ]
}
```

- Publicy Accessable로 설정해 기본적으로 모든 요청을 허용

- `Action: s3:GetObject`에 대해서 모두 허용하는 규칙 명시

- `Action: s3:PutObject`에 대해서 특정 사용자 외의 거부 규칙 명시
  - 이 때, `NotPrincipal` 옵션을 사용해서 **PutObject Deny** Policy를 _적용하지 않을_ 사용자를 명시
  - [IAM](../iam/README.md) 사용자를 새로 하나 생성하고, S3 Full Access 권한을 허용해준 뒤
  - 해당 IAM 유저의 AWS_ACCESS_KEY_ID와 AWS_SECRET_ACCESS_KEY를 사용
  - IAM User Number(Numerical)와 IAM User Name을 Policy에 명시함

### 결과

S3 Storage에 접근하여 객체를 쓰는 서버는 Python 기반으로 작성되었기 때문에 _boto3_ 라이브러리를 사용함

1. `.env` 파일에 명시되어 있는 **AWS_ACCESS_KEY_ID**와 **AWS_SECRET_ACCESS_KEY**를 할당한
   클라이언트 객체는 **_PutObject 요청 성공_**

1. 그렇지 않은 객체는 **_PutObject 요청 거부됨_**

- 즉, 모든 사용자가 S3 Storage에 업로드 된 객체(이 경우 영상)를 볼 수 있지만
- 특정 사용자만 S3 Storage에 새로운 객체를 업로드할 수 있음
  - 이 "특정 사용자"는 적절한 키를 가지고 있는 서버가 됨

:::details 업로드 허용 테스트

```python
import boto3

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# ... 중략 ...

def videoAnalyser(...):
    # ... 중략 ...
    try:
        s3_client.upload_file(outFilename, bucketname, objecetName,
            ExtraArgs={'ContentType': 'video/mp4'})
        print("Success to upload to S3 Storage")
    except Exception:
        print("Failed to upload to S3 Storage")
```

Result:

```txt{8}
[INFO]001_10.mp4 has been uploaded
start to analyse 001_10.mp4
Video has been loaded.
video Framesize 1920.0px * 1080.0px
video FPS 29.97 FPS
video Frames 593.0 frames
INFO: Created TensorFlow Lite XNNPACK delegate for CPU.
Success to upload to S3 Storage / 593.0
```

:::

:::details 업로드 거부 테스트

```python
import boto3

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

s3_client = boto3.client(
    's3',
    # aws_access_key_id=AWS_ACCESS_KEY_ID,
    # aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# ... 중략 ...

def videoAnalyser(...):
    # ... 중략 ...
    try:
        s3_client.upload_file(outFilename, bucketname, objecetName,
            ExtraArgs={'ContentType': 'video/mp4'})
        print("Success to upload to S3 Storage")
    except Exception:
        print("Failed to upload to S3 Storage")
```

Result:

```txt{8}
[INFO]001_10.mp4 has been uploaded
start to analyse 001_10.mp4
Video has been loaded.
video Framesize 1920.0px * 1080.0px
video FPS 29.97 FPS
video Frames 593.0 frames
INFO: Created TensorFlow Lite XNNPACK delegate for CPU.
Failed to upload to S3 Storage / 593.0
```

:::
