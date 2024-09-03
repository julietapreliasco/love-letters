interface FooterLogoProps {
  className?: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={227}
    height={160}
    viewBox="0 0 227 160"
    fill="none"
    className={className}
  >
    <path
      fill="#29241F"
      d="M52.436 0c1.315.432 2.21 1.058 2.685 1.88.254.448.434 1.071.544 1.87-.37 1.29-1.505 2.572-3.41 3.848-1.517 1.065-3.725 1.964-6.63 2.708-1.205.162-1.868.308-1.994.435-.14 0-.364-.036-.679-.095l-2.645.338a.597.597 0 0 0-.312-.117h-.183c-.245-.006-.869.942-1.875 2.848-.318.217-.774 1.049-1.373 2.5-.193-.003-.425.464-.704 1.403-.376.548-.917 1.665-1.623 3.354-.823 1.298-1.444 2.526-1.863 3.682-.211.052-.49.574-.835 1.565-.569.616-1.15 1.633-1.75 3.048-.265.254-.397.4-.397.436h-.156c3.976.737 7.11 1.35 9.401 1.837l.367-.078.936.211.602-.1c1.27.097 1.93.175 1.982.23 1.915.036 4.07-.191 6.465-.685.12.094.223.143.312.146h-.052c.284-.402.584-.6.9-.594l.339.007c-.006.276-.034.415-.086.415h-.08c.007-.279.285-.412.845-.402l.602.01a4.228 4.228 0 0 1-2.01 1.49c-.858.428-1.947.776-3.256 1.048l-.496-.01v.195c-.3-.006-.498-.045-.602-.123-1.465.14-2.4.29-2.804.448-.539-.065-.973-.1-1.306-.107h-.104a2.983 2.983 0 0 0-.707.068c-1.306-.097-2.306-.247-2.997-.445l-.342.104-2.343-.487v.085l-4.089-.91-2.058-.425-.21.107a.848.848 0 0 0-.365-.117H28c-.07 0-.33.42-.779 1.26-.193.107-.453.474-.777 1.094-.104.036-1.168 1.163-3.192 3.38-1.27.975-2.31 1.67-3.12 2.079-.021.295-.596.7-1.719 1.217-2.62 1.487-4.66 2.214-6.125 2.188-.037.036-.762.153-2.175.348-.241-.133-.562-.205-.963-.211h-.08c.105 0 .157.075.154.224l-.493-.23h-.208c-1.844-.04-3.78-1.027-5.804-2.972-.664-.918-1.196-1.993-1.594-3.22l.117-.747.015-.916c.382-.935.572-1.312.569-1.127H1.59c.508-1.289.964-1.928 1.364-1.922.006-.445.609-.948 1.802-1.52.009-.63 1.608-1.327 4.789-2.103 1.241-.309 3.238-.533 5.994-.666l.443.091.55-.075c.698.069 1.316.108 1.854.117l.287.007.731.068-.107.055c3.337.526 5.985.99 7.948 1.396 1.67-2.078 2.511-3.393 2.52-3.948.447-.6.808-1.4 1.086-2.393.395-.604 1.45-2.821 3.168-6.653.57-.71 1.306-2.114 2.211-4.204.725-.673 1.092-1.163 1.095-1.478v-.11c-2.355-.783-3.92-1.497-4.691-2.14-3.664-2.75-5.483-4.929-5.456-6.54l.893-.233c.226.003.902.727 2.028 2.176 3.018 2.811 5.544 4.376 7.578 4.691l.911.211c2.633-3.354 4.988-5.584 7.062-6.692.795-.613 2.073-1.162 3.84-1.649l.392.062c.055-.166.337-.309.844-.429l.392.091c.786-.042 1.22-.107 1.309-.198h.009ZM3.168 35.453c-.042 2.513 1.315 4.295 4.068 5.347l2.107.51c.089-.052.23-.078.419-.075.052 0 .147.02.287.062 0-.02 1.18-.227 3.539-.627 0-.055.544-.25 1.63-.58 2.214-1.069 3.917-2.072 5.119-3.01 1.431-1.12 2.979-2.553 4.645-4.296l.471.01v.194l-.263-.006v.166c-.003.055-.091.08-.266.077l.01-.47c.62-.672 1.03-1.212 1.229-1.614v.11a62.653 62.653 0 0 0-5.37-.792c0-.036.06-.055.183-.052a.841.841 0 0 0-.235.078c-1.6-.178-2.676-.354-3.233-.532-.052.016-.08.126-.085.33-.52-.23-.823-.347-.909-.35C9.2 29.797 4.872 31.362 3.53 34.628l-.351.825h-.01Zm37.775-26.43c0-.036-.034-.055-.104-.058l2.486-.26c.12.078.251.117.389.117 2.954-.646 4.872-1.26 5.752-1.835 2.6-1.321 3.905-2.321 3.918-3.006.104 0 .23-.127.373-.383l.015-.942c-.1-.26-.73-.559-1.893-.896h-.208c-3.303.691-5.868 2.058-7.697 4.097-2.019 1.867-3.028 2.923-3.03 3.163v.003ZM51.934 30.23c.279.042.413.246.407.616-.352.27-.85.4-1.495.39.272-.678.636-1.016 1.088-1.006Z"
    />
    <path
      fill="#29241F"
      d="m56.222 15.94.34-.079c2.11-.146 3.262.137 3.461.841.104-.035.4.517.887 1.653.098.354.052 1.094-.14 2.218l-.025-.085h-.025c.42-.084 1.96-1.175 4.627-3.27.334-.217.615-.35.841-.399.248.893-1.174 2.614-4.266 5.163-.88.574-1.627.932-2.238 1.068-1.294 1.364-2.285 2.28-2.973 2.747a4.31 4.31 0 0 0-.685.263c-1.52.36-2.81-.156-3.869-1.542-.22-.413-.428-.867-.63-1.37-.657-2.345-.14-4.192 1.557-5.546.532-.676 1.385-1.15 2.557-1.422-.016-.056.177-.137.578-.24h.003Zm-3.003 6.24.073.25c.312 1.152.685 1.78 1.12 1.88.311.097.703.087 1.177-.033.966-.594 1.489-1 1.562-1.22v.025c-1.623-.824-2.608-1.834-2.954-3.022-.052.016-.104-.075-.153-.28-.012-.405-.04-.724-.088-.945h-.025c-.786 1.134-1.021 2.247-.71 3.345h-.002Zm2.838-2.555c.55 1.38 1.308 1.948 2.272 1.707l.263-.048c.553-.767.816-1.52.795-2.26-.45-1.267-.997-1.822-1.645-1.666-.034-.11-.138-.143-.312-.09-1.276.308-1.734 1.097-1.37 2.36l-.003-.003Z"
    />
    <path
      fill="#29241F"
      d="M76.91 14.774c0 .149.03.224.101.224-.835 2.036-1.483 3.318-1.945 3.847-.66.877-1.055 1.536-1.183 1.974-3.955 4.293-6.814 6.42-8.572 6.387-1.114-.02-1.832-.812-2.157-2.37v-.11c.025-1.277.802-4.147 2.34-8.611.7-.208 1.156-.312 1.364-.309.278.007.413.341.4 1.007a43.716 43.716 0 0 0-2.113 7.727l-.006.335c0 .11.101.224.31.337 1.201.023 3.461-1.785 6.78-5.422.192-.013.831-.854 1.923-2.516.122 0 .865-.835 2.235-2.51l.523.01ZM82.024 15.088c.434.01.908.332 1.422.971-.019 1.017-.266 1.874-.747 2.565-1.743 2.075-3.162 3.205-4.263 3.39l-1.183.562-.006.39c-.016.85.685 1.288 2.094 1.314.96-.074 1.918-.282 2.872-.626.954-.345 2.303-1.562 4.046-3.656.343-.77.915-1.51 1.71-2.215l.391.007c-.003.26.052.474.171.643v.25c-1.868 4.292-4.584 6.776-8.15 7.448a3.701 3.701 0 0 0-1.125.172c-2.16-.039-3.587-1.214-4.278-3.52l-.104-1.665.443.01c.232-1.384 1.391-2.932 3.474-4.653 1.34-.935 2.42-1.396 3.239-1.383l-.006-.004Zm-4.426 5.273c2.034-.701 3.429-1.84 4.187-3.415v-.11c-.015-.075.003-.111.055-.111-1.275.253-2.636 1.467-4.086 3.64h-.156v-.004Zm11.313-3.09.25.558-.422.214-.627-.013.01-.61.786-.153.003.003ZM133.936 1.52c1.315.431 2.211 1.058 2.685 1.88.254.448.435 1.071.545 1.87-.37 1.289-1.505 2.571-3.41 3.847-1.517 1.065-3.725 1.965-6.63 2.708-1.205.163-1.869.309-1.994.435-.141 0-.364-.035-.679-.094l-2.645.338a.6.6 0 0 0-.312-.117h-.184c-.245-.007-.868.941-1.875 2.847-.318.218-.773 1.05-1.373 2.5-.192-.003-.425.465-.703 1.403-.376.549-.917 1.666-1.624 3.354-.823 1.299-1.443 2.526-1.862 3.682-.211.052-.49.575-.835 1.565-.569.617-1.15 1.633-1.75 3.049-.266.253-.397.4-.397.435h-.156c3.976.737 7.11 1.35 9.404 1.838l.367-.078.936.21.602-.1c1.269.098 1.93.176 1.982.23 1.914.036 4.07-.19 6.465-.684.119.094.223.143.312.146h-.052c.284-.403.584-.6.899-.594l.339.006c-.006.276-.033.416-.085.416h-.08c.006-.28.285-.413.844-.403l.603.01a4.227 4.227 0 0 1-2.01 1.49c-.859.429-1.948.776-3.256 1.049l-.496-.01v.195c-.3-.006-.498-.045-.602-.123-1.465.14-2.401.289-2.805.448a13.6 13.6 0 0 0-1.306-.108h-.104a2.987 2.987 0 0 0-.706.069c-1.306-.098-2.306-.247-2.997-.445l-.343.104-2.342-.487v.084l-4.089-.909-2.058-.425-.211.107a.846.846 0 0 0-.364-.117h-.076c-.071 0-.331.419-.78 1.26-.193.107-.453.474-.777 1.094-.104.036-1.168 1.162-3.193 3.38-1.269.974-2.309 1.669-3.119 2.078-.022.295-.597.701-1.719 1.218-2.62 1.487-4.66 2.214-6.125 2.188-.037.036-.762.153-2.175.347-.241-.133-.563-.204-.963-.21h-.08c.104 0 .156.074.153.223l-.492-.23h-.208c-1.847-.04-3.78-1.026-5.805-2.971-.663-.919-1.195-1.994-1.593-3.221l.116-.747.016-.915c.382-.935.569-1.312.566-1.127h-.236c.508-1.29.963-1.929 1.364-1.922.006-.445.609-.948 1.801-1.52.01-.63 1.609-1.328 4.79-2.104 1.241-.308 3.241-.532 5.993-.665l.444.09.55-.074c.695.068 1.315.107 1.854.117l.287.006.731.069-.107.055c3.336.526 5.985.99 7.948 1.396 1.67-2.078 2.511-3.393 2.52-3.948.447-.601.807-1.4 1.086-2.393.394-.604 1.449-2.822 3.168-6.653.569-.711 1.306-2.114 2.211-4.205.725-.672 1.092-1.162 1.095-1.477v-.11c-2.355-.783-3.921-1.498-4.691-2.14-3.664-2.75-5.484-4.93-5.459-6.54l.893-.233c.226.003.902.727 2.027 2.175 3.019 2.812 5.545 4.377 7.579 4.692l.911.21c2.633-3.353 4.988-5.584 7.061-6.691.795-.614 2.074-1.162 3.841-1.65l.392.062c.055-.165.336-.308.844-.428l.391.09c.786-.042 1.22-.107 1.309-.197h.009ZM84.669 36.972c-.043 2.513 1.315 4.296 4.067 5.348l2.107.51c.09-.052.23-.078.42-.075.051 0 .15.02.287.062 0-.02 1.18-.228 3.538-.627 0-.055.545-.25 1.63-.581 2.211-1.068 3.918-2.072 5.12-3.01 1.431-1.12 2.978-2.552 4.645-4.296l.471.01v.195l-.266-.007v.166c-.003.055-.092.081-.266.078l.009-.47c.621-.673 1.031-1.212 1.229-1.615v.11a62.607 62.607 0 0 0-5.37-.791c0-.036.061-.056.184-.052a.876.876 0 0 0-.236.078c-1.599-.179-2.676-.354-3.232-.533-.052.016-.08.127-.086.331-.52-.23-.823-.347-.908-.35-7.315-.137-11.643 1.428-12.985 4.695l-.355.824h-.003Zm37.778-26.426c0-.036-.034-.055-.104-.059l2.486-.26a.701.701 0 0 0 .388.118c2.955-.647 4.872-1.26 5.753-1.835 2.599-1.321 3.905-2.321 3.917-3.007.104 0 .23-.126.374-.383l.015-.941c-.101-.26-.731-.559-1.893-.896h-.208c-3.303.691-5.869 2.058-7.698 4.097-2.018 1.867-3.027 2.922-3.03 3.163v.003Zm10.991 21.205c.278.043.413.247.407.617-.352.27-.851.4-1.496.39.272-.679.636-1.016 1.089-1.007Z"
    />
    <path
      fill="#29241F"
      d="M139.285 16.16c.434.01.908.331 1.422.97-.018 1.017-.266 1.874-.746 2.566-1.743 2.074-3.162 3.204-4.263 3.39l-1.184.561-.006.39c-.015.85.685 1.289 2.095 1.315.96-.075 1.918-.283 2.872-.627.954-.344 2.303-1.562 4.046-3.656.342-.77.914-1.51 1.709-2.214l.392.006c-.003.26.052.474.171.643v.25c-1.869 4.293-4.584 6.776-8.15 7.449a3.698 3.698 0 0 0-1.126.172c-2.159-.04-3.587-1.215-4.278-3.52l-.104-1.666.444.01c.232-1.383 1.391-2.932 3.474-4.653 1.339-.935 2.419-1.396 3.238-1.383l-.006-.003Zm-4.425 5.273c2.034-.701 3.428-1.841 4.187-3.416v-.11c-.016-.075.003-.11.055-.11-1.276.253-2.637 1.467-4.086 3.64h-.156v-.004Zm11.312-3.091.251.558-.422.215-.627-.013.009-.61.786-.153.003.003Z"
    />
    <path
      fill="#29241F"
      d="m152.83 1.402.52.15.602-.127c.306.432.459.747.456.951-.009.5-.731 1.994-2.165 4.481.03.24.125.364.281.367l1.697.032c.352-.159 3.334-.418 8.949-.776l1.651-.217.526-.13c.609.104 1.138.16 1.59.169.141-.146.832-.263 2.071-.35.364.1.712.152 1.042.158l.419.007c.175 0 .315-.033.419-.104l.181.114c.786-.17 1.318-.254 1.596-.247.382.006.798.107 1.248.302.281-.179.563-.266.841-.263l1.254.022c.174 0 .315-.032.419-.103a.72.72 0 0 0 .416.12l.731.013c.296.006.575-.026.838-.094.259.077.538.12.834.126-.978.091-.412.16 1.695.198-.019-.02.052-.026.211-.022.229-.163.431-.24.605-.238 1.009.091 1.594.14 1.749.143V6l.756.237 3.453-.185.623.123 1.309-.224.101.28 1.309-.114 1.358.026c.122 0 .183.048.18.143-.036 0-.052-.046-.049-.14l1.126-.117c.608.104 1.07.16 1.382.166l-.006.415-.673-.428.652.013c.26.006.565-.036.917-.12l.208.142 1.6-.246.492.285c.104 0 .226-.042.367-.133.141 0 .208.049.205.143.749-.078 1.299-.113 1.648-.107l2.089.039.63-.127c.156.078.232.172.229.283.193.003.499-.075.918-.234l.517.26c.14-.091.278-.042.415.146h.025l-.006.36.367.007c.076-.516.162-.773.247-.773l2.456.046.407.785.523.01c.092-.35.141-.571.141-.662.033 0 .052.058.048.168l-.229-.282c.382.006.856.276 1.422.802.208.003.315-.133.321-.412l-.315-.007.266-.273.315-.048c.043.594.263.893.664.9.009-.517-.327-.738-1.009-.657l1.725.033-.169.636.315.007c.26.006.517-.12.765-.374.193.003.425.146.697.429l.315-.189-.125-.334v-.084c0 .055.018.084.052.084 0-.094.293.081.881.516l.419.007c.006-.28.226-.487.663-.627.104.075.251.117.444.12-.159.107-.089.166.204.17 0-.095.123-.056.364.116.052 0 .202-.042.447-.13l.391.007c0 .02.046-.065.135-.247l.471.01c.015.035.021.185.018.444l.23.283c-.175-.003-.407-.12-.701-.344v-.166l.211.143c-.737.227-1.128.34-1.18.338l-.523-.01a5.456 5.456 0 0 1-.963-.13l-.422.24a5.951 5.951 0 0 0-1.123-.159h-.131c-.493.302-.737.364-.734.179a1.323 1.323 0 0 0-.624-.208c-.23.182-.398.27-.502.27l-.596-.18-.006.277-.679-.013v-.25l-.205-.003c-.144.181-.651.302-1.523.36 0-.09-.153-.143-.468-.146l-.183-.003c-.682.172-1.172.256-1.468.25l-.756-.153-.394.244-.52-.12c-.174 0-.627.07-1.364.224-.973-.186-1.511-.37-1.612-.559h-.183c-.23.25-.389.377-.477.377-.224-.17-.441-.257-.649-.263h-.104c-.14-.004-.63.198-1.474.607l-.18-.114-2.324-.042a4.312 4.312 0 0 0-.915.094.856.856 0 0 0-.443-.12c-.401-.006-.603.055-.603.182-.189-.133-.44-.201-.755-.208l-.627-.013c-.07 0-.352.078-.841.234l-.419-.007c-.156 0-.468-.09-.936-.266l-1.471.36c-.052 0-.146-.048-.284-.142-2.144.126-3.967.175-5.465.149l-.419-.006a3.903 3.903 0 0 0-.942.12l-.492-.26-3.062.191-.519-.149c-.263.107-.395.185-.395.244l-.966-.13-1.462-.026c-.401-.007-.924.074-1.572.247-.208-.004-.373-.052-.495-.15l-3.585.182-.624-.15c-.526.176-.874.26-1.048.257l-1.043-.159c-4.517.192-10.297.63-17.346 1.312.052.02-.181.458-.701 1.318-.003.205-.581 1.442-1.734 3.711-1.391 4.098-2.088 6.26-2.091 6.481 0 .094.03.224.097.39-.223.883-.342 1.789-.357 2.71l-.019 1.166c.156 1.095.731 1.65 1.722 1.67 1.132.022 3.257-1.02 6.376-3.127a21.443 21.443 0 0 0 2.435-1.757c.923-1.02 1.99-2.451 3.208-4.296l.153.254c-.175 1.126-.481 2.126-.912 3.006-2.275 2.825-3.881 4.442-4.81 4.848-.444.474-1.113.977-2.013 1.516-1.798 1.26-3.324 1.88-4.578 1.857-1.443-.246-2.486-.815-3.134-1.694.006-.335-.162-.764-.502-1.286l.107-.221.006-.276c.006-.315-.095-.63-.296-.948v-.22l.22-.384.012-.776a8.97 8.97 0 0 1 .122-1.192 1.12 1.12 0 0 1-.097-.363c.229-1.29.672-2.79 1.327-4.497.122-1.069.413-1.887.877-2.452.23-1.143.557-1.996.985-2.562.505-.99.759-1.633.765-1.928-.104 0-.227-.049-.364-.146l-9.043 1.662c-.606-.344-.991-.72-1.159-1.13l.116-.662.272-.607c5.753-1.224 9.743-1.945 11.979-2.163 1.089-1.607 1.636-2.65 1.645-3.13.269-.363.765-1.383 1.49-3.052l.159-.107.006-.01Zm55.338 5.082.575.01-.01.584-.299.688c-.294-.191-.56-.289-.805-.292.01-.59.19-.922.539-.99Zm7.156.217-.471-.01.009-.584.471.01-.009.584Zm3.768-.263-.016.971-.887-.016.016-.971.887.016Zm1.348.607-.471-.01.009-.584.471.01-.009.584Zm.416.091c-.312-.061-.465-.24-.462-.535l.471.01-.009.525Zm.523.01c.034 0 .052.075.049.224l.917-.234-1.226-.022.26.032Zm1.728-.273v.166c.034 0-.04.09-.217.273h-.052c-.171-.244-.08-.39.269-.439Zm.982.767-.471-.01.009-.585.471.01-.009.585ZM227 7.03l-.55-.01v-.056l.263.007v.11l.048.114c.159-.107.239-.163.239-.163V7.03Z"
    />
    <path
      fill="#29241F"
      d="M176.873 16.861c.435.01.909.331 1.422.971-.018 1.016-.266 1.874-.746 2.565-1.743 2.075-3.162 3.205-4.263 3.39l-1.184.562-.006.39c-.015.85.685 1.288 2.095 1.314.96-.074 1.918-.282 2.872-.626.954-.345 2.303-1.562 4.046-3.656.342-.77.914-1.51 1.709-2.215l.392.007c-.003.26.052.474.171.643v.25c-1.868 4.292-4.584 6.776-8.15 7.448a3.688 3.688 0 0 0-1.125.172c-2.159-.039-3.588-1.214-4.279-3.52l-.104-1.665.444.01c.232-1.384 1.391-2.932 3.474-4.653 1.339-.935 2.419-1.396 3.238-1.383l-.006-.004Zm-4.425 5.273c2.034-.701 3.428-1.84 4.187-3.416v-.11c-.016-.075.003-.11.055-.11-1.276.253-2.636 1.467-4.086 3.64h-.156v-.004Zm11.312-3.09.251.558-.422.214-.627-.013.009-.61.786-.153.003.003Z"
    />
    <path
      fill="#29241F"
      d="M190.008 15.913c.367.006.716.483 1.046 1.435-.012.776-.994 2.672-2.942 5.688-.67 1.448-1.009 2.607-1.024 3.478-.007.315.165.474.513.48l.444.01c1.593-.507 4.04-2.604 7.342-6.299.542-.1.817-.41.826-.929.019-.13.083-.191.187-.191h.079c.086 0 .171.097.257.282l-.006.28c-.006.295-.336.854-.994 1.672-.275.863-1.44 2.331-3.495 4.402-1.364 1.27-2.747 2.16-4.147 2.67l-.34-.007c-1.394-.026-2.306-.643-2.74-1.854 0-.185-.021-.28-.073-.28.055-.24.119-.356.189-.356l-.101-.195.013-.666c.211-1.178 1.073-2.799 2.59-4.86 0-.15.297-.578.884-1.29.379-.714.569-1.181.572-1.405v-.11l-.364-.007c-1.425.805-2.704 1.198-3.835 1.178h-.077c-.07 0-.559.617-1.468 1.858-.192.107-.37.159-.526.155h-.079c-.312-.006-.578-.263-.798-.766.039-.331.315-.669.825-1.01 0-.11.058-.266.165-.467l-.587-.76v-.11c.009-.351.214-.663.618-.932l.627.013 1.336-.335.618.484c1.575-.36 2.826-.753 3.756-1.178.244.003.48-.02.706-.069l.003-.01Z"
    />
    <path
      fill="#29241F"
      d="M199.697 16.316c1.25.282 1.865.96 1.847 2.032-.38 1.77-.844 2.646-1.404 2.637-.07 0-.174.035-.315.103-.367-.006-.642-.233-.826-.681.294-.884.444-1.582.453-2.101 0-.15-.064-.224-.205-.224-1.257.162-1.89.558-1.902 1.185-.028 1.682.572 3.396 1.795 5.137l.208.113c.388-.325 1.095-.792 2.113-1.402 2.15-1.403 4.129-2.16 5.942-2.277.863-.574 1.529-.857 2-.85l.101.224-.006.334c-.297-.006-1 .5-2.116 1.513-1.425.805-3.658 2.078-6.701 3.815l-.428.546c.541 1.01.801 2.123.78 3.344-.425 1.51-1.388 2.747-2.884 3.721-1.165.997-2.535 1.6-4.107 1.809-1.875-.332-2.804-1.013-2.789-2.05l.009-.554c.009-.61.544-1.377 1.606-2.302.782-1.02 2.376-2.471 4.773-4.351l.107-.221v-.22c-1.626-2.582-2.428-4.634-2.403-6.147.168-1.698.703-2.54 1.608-2.523.964-.334 1.872-.54 2.728-.614l.016.003Zm-6.34 16.75v.11c.03.225.272.338.725.348 1.15.023 2.59-.802 4.327-2.47 0-.092.217-.57.651-1.43l.016-.886c0-.185-.061-.52-.193-1.003l-.419-.007c-3.391 2.822-5.092 4.604-5.104 5.341l-.003-.003ZM169.277 22.556a21.442 21.442 0 0 1-2.435 1.757c-3.116 2.107-5.241 3.15-6.376 3.127-.994-.02-1.566-.575-1.722-1.67l.019-1.165c.015-.925.134-1.828.357-2.711a1.122 1.122 0 0 1-.097-.39c.003-.22.7-2.38 2.091-6.48 1.153-2.273 1.731-3.51 1.734-3.712l.689-1.23c.021-.052.027-.085.012-.088.012 0 .024 0 .036-.003l1.634-2.922v-.01l.425-.747c1.153-2.042 1.731-3.29 1.74-3.734.003-.204-.147-.52-.456-.951l-.602.126-.52-.149-.159.107c-.725 1.67-1.221 2.685-1.49 3.052-.009.48-.556 1.526-1.645 3.13l-2.936 6.215h-.254c-.137.39-.26.821-.361 1.321-.461.565-.755 1.383-.877 2.452-.655 1.707-1.098 3.208-1.327 4.497 0 .074.03.194.097.363a8.49 8.49 0 0 0-.122 1.192l-.012.776-.217.383v.22c.202.319.299.634.293.949l-.006.276-.107.22c.34.523.508.952.502 1.286.648.884 1.691 1.448 3.134 1.695 1.254.023 2.78-.594 4.578-1.857.9-.539 1.569-1.042 2.013-1.516.929-.41 2.532-2.023 4.81-4.848.431-.88 2.548-1.555 2.725-2.678l-1.774.477c-1.214 1.847-2.474 2.22-3.397 3.237l.003.003ZM3.4 59.106c.102-.084.294-.224.637-.432.125-.042.7-.178 2.847-.178h5.281V96.38h2.141c4.214 0 6.85.066 7.832.199l1.245.165V58.496h3.73c4.062 0 5.123.22 5.392.315l.649.23.905-.96V47.975l-1.419-.503-.468.386c-.098.081-.287.22-.636.432-.125.042-.7.178-2.847.178H8.462c-4.061 0-5.122-.22-5.392-.315l-.651-.23-.905.961v10.104l1.416.5.468-.386.003.003ZM75.186 90.228c4.675-4.844 7.046-10.994 7.046-18.277 0-7.283-2.312-13.601-6.875-18.062-4.257-4.163-9.557-6.27-15.753-6.27-3.584 0-6.875.711-9.783 2.107-2.9 1.396-5.407 3.302-7.456 5.67-2.046 2.36-3.64 5.13-4.737 8.224-1.098 3.087-1.651 6.402-1.651 9.85 0 3.449.599 6.709 1.783 9.628 1.183 2.919 2.825 5.458 4.88 7.545 2.052 2.085 4.493 3.721 7.251 4.87 2.753 1.147 5.484 1.725 8.117 1.725 2.633 0 4.893-.28 6.85-.828a22.725 22.725 0 0 0 10.33-6.189l-.002.007ZM70.98 72.704c0 4.286-1.074 7.696-3.184 10.124-2.08 2.354-4.783 3.5-8.257 3.5-3.685 0-6.603-1.207-8.92-3.688-1.074-1.16-1.927-2.575-2.536-4.202-.612-1.633-.92-3.458-.92-5.422 0-4.16 1.036-7.646 3.082-10.364 2.165-2.883 5.015-4.283 8.716-4.283 3.7 0 6.765 1.383 8.948 4.224 2.04 2.673 3.077 6.075 3.077 10.118l-.006-.007ZM116.697 58.5v37.884h2.141c4.214 0 6.85.065 7.832.198l1.245.166V58.499h3.731c4.061 0 5.122.221 5.391.316l.649.23.905-.961V47.98l-1.419-.504-.468.387c-.098.08-.287.22-.633.431-.125.043-.7.18-2.847.18h-20.23c-4.061 0-5.123-.222-5.392-.316l-.651-.23-.905.96v10.105l1.416.5.467-.386c.101-.085.294-.224.637-.432.125-.042.7-.179 2.847-.179h5.281l.003.003ZM177.797 49.375l-.015-1.708-1.505.614c-.077.033-.578.192-2.768.192-1.663 0-3.391-.059-5.144-.17l-1.174-.074v18.228h-12.948V48.005l-1.279.208c-1.058.172-2.422.26-4.058.26h-1.324c-.529 0-1.456-.056-2.749-.17l-1.199-.103v48.184h2.141c2.804 0 5.253.068 7.287.204l1.178.078V77.032h12.948v19.355h3.367c2.994 0 5.009.065 5.994.198l1.245.166V49.379l.003-.004ZM212.663 85.329l-.367.195c-.162.087-.709.285-2.278.285h-12.055v-9.977h6.893c1.587 0 2.896.055 3.887.165l1.238.136-.128-11.302-1.383.4c-.134.038-.813.165-3.966.165h-6.538v-6.38h9.055c1.951 0 3.456.156 4.468.468l.78.236.786-1.253-.12-.506s-.03-.137-.03-.536c0-3.296.116-5.955.345-7.903l.162-1.37-1.299.048c-4.777.182-9.682.273-14.576.273-1.752 0-3.391-.023-4.871-.068l-2.257-.068a40.132 40.132 0 0 1-1.887-.1l-1.19-.095v48.242h26.337l.401-10.682-1.401-.373h-.006ZM52.02 111.235c-2.058 0-3.737-.046-4.991-.133l-.948-.068-5.689 27.079-6.648-27.297-.988.159c-1.076.172-2.137.26-3.156.26-1.018 0-1.936-.023-2.609-.065h-.733c-.251-.023-.532-.045-.841-.068l-.92-.065-6.588 27.394-6.82-27.764-1.098.347c-.266.085-1.073.224-3.492.224-1.933 0-3.59-.045-4.933-.136L0 110.998l11.395 42.274c.278 1.114.486 1.965.624 2.552.162.695.22.994.238 1.124.025.165.037.321.037.474l-.275.516.636 1.351.752-.075c.434-.042 1.01-.065 1.707-.065h3.743c1.492 0 2.55.042 3.144.127l.685.097.822-1.311-.266-.51c-.012-.15-.03-.581.043-1.659.021-.332.257-1.724 1.581-7.332l3.982-16.806 4.187 16.884.865 4.624c.22 1.162.37 2 .462 2.558.113.689.153.984.168 1.107.015.16.024.319.024.484l-.275.513.633 1.351.756-.075c.434-.042 1.17-.065 2.19-.065h3.516c1.431 0 2.483.043 3.123.127l.678.091.811-1.26-.29-.61s-.019-.059-.019-.208c0-.179.015-.588.092-1.507.034-.389.312-1.837 1.835-7.192l9.29-36.137.53-2.153-1.994.743c-.09.033-.667.198-3.413.198l.003.007ZM97.425 116.651c-4.257-4.162-9.557-6.27-15.753-6.27-3.584 0-6.875.708-9.783 2.108-2.9 1.396-5.407 3.302-7.456 5.669-2.046 2.36-3.64 5.13-4.737 8.224-1.095 3.088-1.652 6.403-1.652 9.851 0 3.448.6 6.708 1.783 9.627 1.184 2.919 2.826 5.458 4.881 7.546 2.052 2.084 4.493 3.721 7.251 4.87 2.752 1.146 5.483 1.724 8.117 1.724 2.633 0 4.893-.279 6.85-.828a22.724 22.724 0 0 0 10.33-6.188c4.676-4.845 7.047-10.994 7.047-18.277 0-7.283-2.312-13.601-6.875-18.062l-.003.006Zm-4.377 18.816c0 4.286-1.073 7.695-3.183 10.12-2.08 2.354-4.783 3.501-8.257 3.501-3.685 0-6.603-1.208-8.921-3.689-1.073-1.162-1.927-2.575-2.535-4.201-.612-1.634-.92-3.458-.92-5.423 0-4.159 1.036-7.646 3.082-10.364 2.165-2.883 5.015-4.282 8.716-4.282 3.7 0 6.764 1.383 8.948 4.224 2.04 2.672 3.077 6.075 3.077 10.117l-.007-.003ZM140.875 152.123l-6.14-13.744a15.088 15.088 0 0 0 2.351-1.886c2.909-2.913 4.38-6.474 4.38-10.585 0-5.253-1.63-9.218-4.848-11.783-3.119-2.487-7.841-3.747-14.04-3.747-4.413 0-8.196.211-11.239.627l-.966.133v48.012h10.768v-17.728c.893.058 1.612.087 2.15.087.468 0 .923-.009 1.361-.026l7.495 18.008.786-.069c4.361-.376 7.582-.392 9.569-.045l.563.097 1.45-1.542-.988-.818c-.245-.201-.994-1.094-2.649-4.987l-.003-.004Zm-9.853-26.043c0 2.046-.603 3.52-1.835 4.494-.593.458-1.312.805-2.141 1.029-.871.237-1.984.357-3.306.357-.951 0-1.822-.039-2.602-.11v-10.958a28.1 28.1 0 0 1 2.055-.075c2.676 0 4.694.399 5.991 1.175 1.235.763 1.838 2.101 1.838 4.088ZM165.524 148.572h-5.572v-37.525l-1.153.049c-2.116.091-4.006.136-5.618.136-2 0-2.7-.107-2.941-.172l-1.377-.367v48.811l1.245-.166c.982-.13 3.052-.198 6.153-.198h3.064c4.921 0 8.465.081 10.536.237l1.186.091v-1.607c0-.127.031-1.374.227-8.289l.039-1.354-1.269.149c-1.116.133-2.639.198-4.523.198l.003.007ZM206.639 116.96c-2.15-2.114-4.854-3.76-8.031-4.893-3.144-1.121-6.695-1.689-10.548-1.689-3.853 0-7.15.188-10.022.555l-.975.127v47.856l.911.175c3.129.604 6.505.909 10.04.909 7.551 0 13.569-1.996 17.888-5.935 4.838-4.416 7.29-10.929 7.29-19.355 0-7.549-2.205-13.523-6.55-17.75h-.003Zm-7.949 29.481a9.785 9.785 0 0 1-3.773 2.449c-1.49.538-2.89.811-4.16.811a20.57 20.57 0 0 1-3.085-.234V121.09h.764c2.306 0 4.355.292 6.089.87 5.144 1.717 7.646 6.279 7.646 13.948 0 4.624-1.169 8.166-3.475 10.533h-.006Z"
    />
  </svg>
);
export default FooterLogo;
